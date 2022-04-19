import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/img/github-logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [_repository, _setRepository] = useState<Repository | null>(null);
  const [_issues, _setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      _setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      _setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/dashboard">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {_repository && (
        <RepositoryInfo>
          <header>
            <img
              src={_repository.owner.avatar_url}
              alt={_repository.owner.login}
            />
            <div>
              <strong>{_repository.full_name}</strong>
              <p>{_repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{_repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{_repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{_repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {_issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;

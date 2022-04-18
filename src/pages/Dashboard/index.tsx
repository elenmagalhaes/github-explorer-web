import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/img/github-logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [_inputRepo, _setInputRepo] = useState('');
  const [_repositories, _setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${_inputRepo}`);
    const repository = response.data;
    _setRepositories([..._repositories, repository]);
    _setInputRepo('');
  };

  return (
    <>
      <img src={logoImg} alt="" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={_inputRepo}
          onChange={e => _setInputRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {_repositories.map(repository => (
          <a href="teste" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

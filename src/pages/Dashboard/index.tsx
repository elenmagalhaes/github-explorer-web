import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/img/github-logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  /** Controla o estado do valor digitado no campo de input de repositório */
  const [_inputRepo, _setInputRepo] = useState('');
  /** Controla o estado do erro ao tentar buscar um repositório */
  const [_inputError, _setInputError] = useState('');
  /** Controla o estado da lista de repositórios */
  const [_repositories, _setRepositories] = useState<Repository[]>([]);

  /**
   * Evento disparado no submit do form
   */
  const handleAddRepository = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!_inputRepo) {
      _setInputError('Digite autor/nome do repositório.');

      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${_inputRepo}`);
      const repository = response.data;
      _setRepositories([..._repositories, repository]);
      _setInputRepo('');
      _setInputError('');
    } catch (error) {
      _setInputError('Erro na busca por este repositório.');
    }
  };

  return (
    <>
      <img src={logoImg} alt="" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!_inputError} onSubmit={handleAddRepository}>
        <input
          value={_inputRepo}
          onChange={e => _setInputRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {_inputError && <Error>{_inputError}</Error>}

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

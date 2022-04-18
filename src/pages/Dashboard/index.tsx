import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/img/github-logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/51779470?v=4"
            alt="Imagem Perfil"
          />
          <div>
            <strong>elenmagalhaes/gobarber-api</strong>
            <p>No description, website, or topics provided</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;

'use client';

import { registrar } from '@/app/lib/actions/auth';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from 'react';

const PaginaRegistro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');

  return (
    <main>
      <form action={registrar} method="POST">
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label className="p-hidden-accessible" htmlFor="nome">
            Nome de usuário
          </label>
          <InputText
            id="nome"
            name="nome"
            value={nome}
            placeholder="Nome de usuário"
            required
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label className="p-hidden-accessible" htmlFor="email">
            E-mail
          </label>
          <InputText
            id="email"
            name="email"
            value={email}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label className="p-hidden-accessible" htmlFor="senha">
            Senha
          </label>
          <Password
            id="senha"
            name="senha"
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label className="p-hidden-accessible" htmlFor="senhaRepetida">
            Confirmar senha
          </label>
          <Password
            id="senhaRepetida"
            name="senhaRepetida"
            value={senhaRepetida}
            required
            onChange={(e) => setSenhaRepetida(e.target.value)}
          />
        </div>
        <Button type="submit" label="Registrar" />
      </form>
    </main>
  );
};

export default PaginaRegistro;

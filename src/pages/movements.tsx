import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { MovementCreate } from "../components/MovementCreate";
import { MovementItem } from "../components/MovementItem";
import { api } from "../services/api";

export type Movement = {
  id: number;
  container_id: string;
  type: string;
  start_hour: Date;
  end_hour: Date;
};

const Movements: NextPage = () => {
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    api.get<Movement[]>("/movements").then((response) => {
      setMovements(response.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Porto | Moviemtnações</title>
      </Head>
      <Layout>
        <header className="border-b-2 pb-2 mb-12">
          <h1 className="text-xl font-bold">Movimentações</h1>
        </header>
        <table className="w-full">
          <thead className="text-left font-light text-gray-500 uppercase text-sm">
            <tr className="border-b">
              <th>Contêiner</th>
              <th>Tipo</th>
              <th>Data de início</th>
              <th>data do fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => {
              return <MovementItem movement={movement} key={movement.id} />;
            })}
            <MovementCreate />
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Movements;

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";

type Container = {
  id: string;
  client: string;
  container_number: string;
  type: 20 | 40;
  status: "full" | "empty";
  category: "import" | "export";
};

const Home: NextPage = () => {
  const [containers, setContainers] = useState<Container[]>([]);

  const [client, setClient] = useState("");
  const [container_number, setContainerNumber] = useState("");
  const [type, setType] = useState("20");
  const [status, setStatus] = useState("empty");
  const [category, setCategory] = useState("import");

  useEffect(() => {
    api.get<Container[]>("/containers").then((response) => {
      setContainers(response.data);
    });
  }, []);

  const handleCreateContainer = async () => {
    if (!client || !container_number || !type || !status || !category) {
      return;
    }
    const newContainer = {
      client,
      container_number,
      type,
      status,
      category,
    };
    try {
      await api.post("/containers", newContainer);
      const response = await api.get<Container[]>("/containers");
      setContainers(response.data);
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <title>Porto | Contêiners</title>
      </Head>
      <Layout>
        <header className="border-b-2 pb-2 mb-12">
          <h1 className="text-xl font-bold">Containers</h1>
        </header>
        <table className="w-full">
          <thead className="text-left font-light text-gray-500 uppercase text-sm">
            <tr className="border-b">
              <th>Cliente</th>
              <th>Número do Container</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container) => {
              return (
                <tr key={container.id} className="border-b border-gray-700">
                  <td className="p-4">{container.client}</td>
                  <td className="p-4">{container.container_number}</td>
                  <td className="p-4">{container.type}</td>
                  <td className="p-4">{container.status}</td>
                  <td className="p-4">{container.category}</td>
                </tr>
              );
            })}
            <tr>
              <td className="py-4">
                <input
                  name="client"
                  type="text"
                  onChange={(event) => setClient(event.target.value)}
                  value={client}
                  className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
                  placeholder="Nome do Cliente"
                />
              </td>
              <td>
                <input
                  name="container_number"
                  type="text"
                  onChange={(event) => setContainerNumber(event.target.value)}
                  value={container_number}
                  className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
                  placeholder="Número do Container"
                />
              </td>
              <td>
                <select
                  name="type"
                  onChange={(event) => setType(event.currentTarget.value)}
                  defaultValue={type}
                  className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
                >
                  <option value="20">20</option>
                  <option value="40">40</option>
                </select>
              </td>
              <td>
                <select
                  name="status"
                  onChange={(event) => setStatus(event.currentTarget.value)}
                  defaultValue={status}
                  className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
                >
                  <option value="empty">Vazio</option>
                  <option value="full">Cheio</option>
                </select>
              </td>
              <td>
                <select
                  name="category"
                  onChange={(event) => setCategory(event.currentTarget.value)}
                  defaultValue={category}
                  className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
                >
                  <option value="import">Importação</option>
                  <option value="export">Exportação</option>
                </select>
              </td>
              <td>
                <button
                  type="submit"
                  onClick={() => handleCreateContainer()}
                  className="bg-blue-500 text-white rounded-lg px-4 py-1"
                >
                  Criar Container
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Home;

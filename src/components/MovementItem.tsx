import { format } from "date-fns";
import { useState } from "react";
import { Movement } from "../pages/movements";
import { api } from "../services/api";

type MovementItemProps = {
  movement: Movement;
};

export const MovementItem: React.FC<MovementItemProps> = ({ movement }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [container_id, setContainerId] = useState(movement.container_id);
  const [type, setType] = useState(movement.type);
  const [start_hour, setStartHour] = useState(new Date(movement.start_hour));
  const [end_hour, setEndHour] = useState(new Date(movement.end_hour));

  const handleSaveMovement = async () => {
    api.put(`containers/${movement.id}`, {
      container_id,
      type,
      start_hour,
      end_hour,
    });
    setIsEditing(false);
  };

  const handleDeleteMovement = async () => {
    setIsEditing(false);
  };

  console.log();

  return isEditing ? (
    <tr>
      <td className="p-4">
        <input
          name="cotnainer_id"
          type="text"
          value={container_id}
          onChange={(event) => setContainerId(event.target.value)}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
          placeholder="Número do Container"
        />
      </td>
      <td className="p-4">
        <select
          name="type"
          onChange={(event) => setType(event.currentTarget.value)}
          defaultValue={type}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
        >
          <option value="boarding">embarque</option>
          <option value="unloading">descarga</option>
          <option value="gate in">gate in</option>
          <option value="gate out">gate out</option>
          <option value="repositioning">reposicionamento</option>
          <option value="weighing">pesagem</option>
          <option value="scanner">scanner</option>
        </select>
      </td>
      <td className="p-4">
        <input
          type="datetime-local"
          name="start_hour"
          onChange={(event) => setStartHour(new Date(event.target.value))}
          value={format(new Date(movement.start_hour), "dd/MM/yyyy hh:mm")}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
        />
      </td>
      <td className="p-4">
        <input
          type="datetime-local"
          name="end_hour"
          onChange={(event) => setEndHour(new Date(event.target.value))}
          value={format(new Date(movement.end_hour), "dd/MM/yyyy hh:mm")}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
        />
      </td>
      <td className="flex py-4">
        <button
          type="submit"
          onClick={() => handleSaveMovement()}
          className="bg-blue-500 text-white rounded-lg px-4 py-1 mr-2"
        >
          Salvar
        </button>
        <button
          onClick={() => handleDeleteMovement()}
          className="rounded-lg px-4 py-1 border border-red-500 text-sm"
        >
          Deletar
        </button>
      </td>
    </tr>
  ) : (
    <tr key={movement.id}>
      <td className="p-4">{movement.container_id}</td>
      <td className="p-4">{movement.type}</td>
      <td className="p-4">{movement.start_hour}</td>
      <td className="p-4">{movement.end_hour}</td>
      <td className="py-4">
        <button
          className="rounded border border-gray-700 py-1 px-4 text-sm"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

import { useState } from "react";
import { api } from "../services/api";

export const MovementCreate: React.FC = () => {
  const [container_id, setContainerId] = useState("");
  const [type, setType] = useState("onboarding");
  const [start_hour, setStartHour] = useState("");
  const [end_hour, setEndHour] = useState("");

  const handleCreateMovement = async () => {
    if (!container_id || !start_hour || !end_hour) {
      return;
    }

    try {
      await api.post("/movements", {
        container_id,
        type,
        start_hour,
        end_hour,
      });
    } catch (error) {}
  };

  return (
    <tr>
      <td>
        <input
          name="cotnainer_id"
          type="text"
          onChange={(event) => setContainerId(event.target.value)}
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
          <option value="boarding">embarque</option>
          <option value="unloading">descarga</option>
          <option value="gate in">gate in</option>
          <option value="gate out">gate out</option>
          <option value="repositioning">reposicionamento</option>
          <option value="weighing">pesagem</option>
          <option value="scanner">scanner</option>
        </select>
      </td>
      <td>
        <input
          type="datetime-local"
          name="start_hour"
          onChange={(event) => setStartHour(event.target.value)}
          value={start_hour}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
        />
      </td>
      <td>
        <input
          type="datetime-local"
          name="end_hour"
          onChange={(event) => setEndHour(event.target.value)}
          value={end_hour}
          className="bg-gray-900 placeholder:text-gray-700 px-4 py-1 rounded-full"
        />
      </td>
      <td>
        <button
          type="submit"
          onClick={() => handleCreateMovement()}
          className="bg-blue-500 text-white rounded-lg px-4 py-1"
        >
          Criar Movimentação
        </button>
      </td>
    </tr>
  );
};

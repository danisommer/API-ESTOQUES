import { useNavigate } from "react-router-dom";
import api from "../services/api";
import React, { useEffect, useState } from "react";

const SummaryPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = api.getToken();
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      fetchMateriais();
    }
  }, [isAuthenticated, navigate]);

  const fetchMateriais = async () => {
    try {
      const data = await api.getMateriais();
      setMateriais(data);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  };

  const handleAddMaterial = async () => {
    try {
      await api.addMaterial(nome, quantidade);
      setNome("");
      setQuantidade("");
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao adicionar material:", error);
    }
  };

  const handleUpdateMaterial = async () => {
    try {
      await api.updateMaterial(editingMaterial.id, nome, quantidade);
      setNome("");
      setQuantidade("");
      setEditingMaterial(null);
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao atualizar material:", error);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await api.deleteMaterial(id);
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao deletar material:", error);
    }
  };

  const handleLogout = () => {
    api.logout();
    handleHome();
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setNome(material.nome);
    setQuantidade(material.quantidade);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <img
          className="logo"
          src="../Storage_icon.png"
          alt="Logo"
          onClick={handleLogout}
        />
        <button onClick={handleLogout}>Sair</button>
      </div>
      <div className="material-form">
        <input
          type="text"
          placeholder="Nome do Material"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        {editingMaterial ? (
          <button onClick={handleUpdateMaterial}>Atualizar Material</button>
        ) : (
          <button onClick={handleAddMaterial}>Adicionar Material</button>
        )}
      </div>
      <ul>
        {materiais.map((material) => (
          <div key={material.id}>
            {material.nome} - {material.quantidade}
            <button onClick={() => handleEditMaterial(material)}>Editar</button>
            <button onClick={() => handleDeleteMaterial(material.id)}>
              Excluir
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SummaryPage;

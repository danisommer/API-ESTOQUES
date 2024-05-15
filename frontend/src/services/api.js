import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = {
  // Função para registrar um novo usuário
  registrar: async (nome, email, senha) => {
    try {
      const response = await axios.post(`${API_URL}/registrar`, { nome, email, senha });
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  },

  // Função para logar um usuário
  login: async (email, senha) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Função para buscar todos os materiais
  getMateriais: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/materiais`, {
        headers: { 'x-access-token': token },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar materiais:', error);
      throw error;
    }
  },

  // Função para adicionar um novo material
  addMaterial: async (token, nome, quantidade) => {
    try {
      const response = await axios.post(`${API_URL}/materiais`, { nome, quantidade }, {
        headers: { 'x-access-token': token },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar material:', error);
      throw error;
    }
  },

  // Função para atualizar um material existente
  updateMaterial: async (token, id, nome, quantidade) => {
    try {
      const response = await axios.put(`${API_URL}/materiais`, { id, nome, quantidade }, {
        headers: { 'x-access-token': token },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar material:', error);
      throw error;
    }
  },

  // Função para deletar um material
  deleteMaterial: async (token, id) => {
    try {
      const response = await axios.delete(`${API_URL}/materiais`, {
        headers: { 'x-access-token': token },
        data: { id },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar material:', error);
      throw error;
    }
  },
};

export default api;

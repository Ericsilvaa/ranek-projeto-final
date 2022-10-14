<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome">
    <!-- preço -->
    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco">
    <!-- fotos -->
    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos">
    <!-- descrição -->
    <label for="nome">Descrição</label>
    <textarea id="nome" name="nome" v-model="produto.descricao"></textarea>

    <!-- adicionar produto -->
    <input class="btn" value="Adiconar Produto" @click.prevent="adicionarProduto" type="button">
  </form>
</template>

<script>
import { api } from "@/services";


export default {
  name: 'ProdutosAdicionar',
  data() {
      return{
        produto: {
          nome: '',
          preco: '', 
          descricao: '',
          fotos: null
        }
      }
    },
  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id
    },
    adicionarProduto() {
      this.formatarProduto()
      api.post('/produto', this.produto)
        .then(() => {
          this.$store.dispatch("getUsuarioProdutos")
        })
    }
  }
}
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
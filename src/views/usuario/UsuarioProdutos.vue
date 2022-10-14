<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutosAdicionar />
    <h2>Seus Produtos</h2>

    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, i) in usuario_produtos" :key="i">
        <ProdutosItem  :produto='produto'>
          <p>{{produto.descricao}}</p>
          <button class="deletar" 
            @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutosItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from '@/components/ProdutosAdicionar.vue'
import ProdutosItem from '@/components/ProdutosItem.vue'
import { mapState, mapActions } from 'vuex'
import { api } from '@/services'

export default {
  name: 'UsuarioProdutos',
  components: { ProdutosAdicionar, ProdutosItem},
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm('Deseja remover este produto?')
      if(confirmar) {
        api.delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos()
          }).catch(error => {
            console.log(error.response)
          })
      }
    }
  },
  watch: {
    login() {
      this.getUsuarioProdutos()
    }
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos()
    }
  }

}
</script>

<style scoped>

h2 {
  margin-bottom: 20px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all .3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
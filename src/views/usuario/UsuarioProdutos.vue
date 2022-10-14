<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutosAdicionar />
    <h2>Seus Produtos</h2>

    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, i) in usuario_produtos" :key="i">
        <ProdutosItem  :produto='produto'>
         <p>{{produto.descricao}}</p>

        </ProdutosItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from '@/components/ProdutosAdicionar.vue'
import ProdutosItem from '@/components/ProdutosItem.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UsuarioProdutos',
  components: { ProdutosAdicionar, ProdutosItem},
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"])
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

</style>
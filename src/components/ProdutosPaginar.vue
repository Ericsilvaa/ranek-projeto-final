<template>
    <ul v-if="paginasTotal > 1">
      <li v-for="pagina in paginas" :key="pagina">
        <router-link :to="{query: query(pagina)}">
          {{pagina}}
        </router-link>
      </li>
    </ul>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    // Requisição para Outra pagina (?_page=1;2;3)
    produtosTotal: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    // calculo paginação
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina
      return total !== Infinity ? Math.ceil(total) : 0
    },
    // range de paginas
    paginas() {
      const paginaAtual = Number(this.$route.query._page)
      const range = 5
      const offset = Math.ceil(range / 2)
      const total = this.paginasTotal
      const pagesArray = []
      // array com total de paginas
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i)
      }
      pagesArray.splice(0, paginaAtual - offset)
      pagesArray.splice(range, total)
      
      return pagesArray
    }
  },
  methods: {
    // "saber" qual query anterior
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina
      }
    }
  }
}

</script>

<style scoped>

ul {
  grid-column: 1 / -1 ;
}

li {
  display: inline-block;
}

li a {
padding: 2px 8px;
border-radius: 2px;
margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}

</style>
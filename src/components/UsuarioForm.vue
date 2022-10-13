<template>
  <form>
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="nome">
    <!-- Email -->
    <label for="email">Email</label>
    <input id="email" name="email" type="email" v-model="email">
    <!-- Senha -->
    <label for="senha">Senha</label>
    <input id="senha" name="senha" type="password" v-model="senha">
    <!-- Cep -->
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep">
    <!-- Rua -->
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua">
    <!-- Numero -->
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero">
    <!-- Bairro -->
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro">
    <!-- Cidade -->
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade">
    <!-- Estado -->
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado">
    
    <div class="button">
      <!-- Tudo que colocar dentro do Usuario Form dentro de LoginCriar -->
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from '@/helpers'
import { getCep } from '@/services'

export default {

  computed: {
    // Retorna de modo 'automatico' o nome, get() e set()
    ...mapFields({
      fields: ["nome","email","senha","cep","rua","numero","bairro","cidade","estado"],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    })
  },
  methods: {
    preencherCep() {
      const cep =  this.cep.replace(/\D/g, "")
      if(cep.length === 8) {
        getCep(cep).then(r => {
          this.rua = r.data.logradouro
          this.bairro = r.data.bairro
          this.estado = r.data.uf
          this.cidade = r.data.localidade
        })
      }  
    }
  }

}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}


.button {
  grid-column: 2;
  margin-top: 10px;
}

</style>
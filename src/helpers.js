// funções JS gerais .. 

// pegando query url
export function serialize(obj) {
  let queryString = ""
  for(let key in obj) {
    queryString += `&${key}=${obj[key]}`
  }
  return queryString
} 


// pegando iniciais de [label], [base] e [modificando as mutations]
export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      }
    };
  }
  return object;
}

//  Methods para criar usuario 
// export function criarUsuario(){
//   async criarUsuario() {
//     try {
//         await this.$store.dispatch('criarUsuario', this.$store.state.usuario);
//         await this.$store.dispatch('getUsuario', this.$store.state.usuario.email);  
//         this.$router.push({name: "usuario"})
//     } catch (error) {
//         console.log(error)
//     }
//     }
// }
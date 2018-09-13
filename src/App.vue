<template>
  <div>
    <button class="btn" @click="sendKey('left')">Voltar</button>
    <button class="btn" @click="sendKey('right')">Próximo</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    sendKey (key) {
      axios.post(`${window.location.origin}/${key}`)
    }
  }
}
</script>

<style>
.btn {
  display: block;
  width: 100%;
  border: none;
  background-color: #F4F4F4;
  padding: 15px 25px;
  font-size: 16px;
  text-align: center;
  margin: 50px 0;
}
</style>

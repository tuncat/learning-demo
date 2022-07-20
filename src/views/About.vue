<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button @click="$store.commit('add')">{{$store.state.counter}}</button>
    </div>
    <div>
      <button @click="$store.dispatch('add')">async:{{$store.state.counter}}</button>
    </div>
    <div>
      <p>getters:{{$store.getters.doubleCounter}}</p>
    </div>
  </div>
</template>
<style lang="less">
button {
  width:80px;
  margin-bottom:10px;
  cursor:pointer;
}
</style>

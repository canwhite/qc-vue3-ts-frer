<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div >------------------------async---------------------</div>
  <div>
    <p>sync number: {{syncNum}}</p>
    <button @click="syncAdd"> +1 </button>
    <button style="margin-left:5px" @click="syncSub"> -1 </button>

  </div>
  <div>------------------------async--------------------- </div>
  <p>async number:{{data}}</p>
  <p><button @click="asyncTest">async test</button></p>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { dispatch } from 'frer'
import { count$, async$ } from '../state/index'
const syncNum = ref<any>(0)
const data = ref<any>('')
onMounted(() => {
  count$.subscribe((res:any) => {
    console.log('---sync----', res)
    syncNum.value = res
  })
  async$.subscribe((res:any) => {
    console.log('---async---', res)
    data.value = res?.data
  })
})
// --------------sync----------------
function syncAdd () {
  dispatch('count', {
    type: 'add'
  })
}

function syncSub () {
  dispatch('count', {
    type: 'sub'
  })
}
// --------------async----------------
const getRequestData = (params:any) => {
  return new Promise((resolve:any, reject:any) => {
    setTimeout(() => {
      resolve({ data: 'content' })
    }, 3000)
  })
}
function asyncTest () {
  dispatch('async_res',
    {
      type: 'async',
      payload: { a: '123' }, // 参数
      request: getRequestData // 异步方法
    })
}

</script>

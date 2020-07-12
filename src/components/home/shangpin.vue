<template>
  <div>
    <ul class="rq-list">
      <li v-for="(item,index) in rqList" :key="index">
        <img :src="item.pic" alt />
        <p>{{item.name}}</p>
        <p>{{item.characteristic}}</p>
        <p style="color:red">${{item.minPrice}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props:['rqList'],
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: 50%;
      padding: 0.2rem 0.5rem;
      box-sizing: border-box;
      p {
        font-size: 0.2rem;
        line-height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 100%;
      }
    }
  }
</style>

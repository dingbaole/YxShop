<template>
  <div>
    <ul>
      <li v-for="(item,index) in kanList" :key="index" class="kan-list">
        <div class="kan-left">
          <img :src="item.pic" alt />
        </div>
        <div class="kan-right">
          <p class="p-name" v-html="item.name"></p>
          <p class="p-characteristic" v-html="item.characteristic"></p>
          <ul>
            <li>
              <p class="p-red">${{ item.minPrice }}</p>
              <p class="p-black">低价</p>
            </li>
            <li>
              <p>${{ item.originalPrice }}</p>
              <p>原价</p>
            </li>
            <li>
              <p>${{ item.stores }}件</p>
              <p>限量</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props:['kanList'],
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
        ul{
            width: 100%;
            background: white;
            .kan-list{
                width: 100%;
                display: flex;
                padding: 0.2rem;
                box-sizing: border-box;
                border-top: 1px solid rgb(192, 184, 184);
                .kan-left{
                    width: 30%;
                    img{
                        width: 100%;
                    }
                }
                .kan-right{
                    margin-left: 0.1rem;
                    width: 70%;
                    position: relative;
                    .p-characteristic{
                        line-height: 0.7rem;
                        font-size: 0.2rem;
                        color: rgb(187, 187, 187);
                    }
                    ul{
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        bottom: 0;
                        li{
                            border: none;
                            
                            .p-red{
                                color: red;
                            }
                            .p-black{
                                color: black;
                            }
                            p{
                                color: rgb(184, 179, 179);
                                text-align: center;
                                line-height: 0.4rem;
                            }
                        }
                    }
                }
            }
        }
</style>

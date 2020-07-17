<template>
  <div class="box">
      <div v-for="(item,index) in imgList" :key="index" class="item">
        <img
          
          alt
          :src="item.pic"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getimg();
    window.addEventListener("scroll", this.ljz);
  },
  data() {
    return {
      imgList: []
    };
  },
  components: {},
  methods: {
    getimg() {
      this.$axios("https://api.it120.cc/small4/shop/goods/list").then(res => {
        this.imgList = res.data;
        this.$nextTick(() => {
        //   this.ljz();
          this.pbl();
        });
      });
    },
    ljz() {
      var wind = document.documentElement || document.body;
      var img = document.querySelectorAll("img");
      for (let i = 0; i < img.length; i++) {
        if (wind.clientHeight + wind.scrollTop > img[i].offsetTop) {
          window.setTimeout(function() {
            img[i].src = img[i].getAttribute("data-src");
          }, 2000);
        }
      }
    },
    pbl() {
      let img_arr = document.querySelectorAll(".item");
      console.log(img_arr);
      // 屏幕的宽度
      let pm_width = document.documentElement.clientWidth;
      //元素宽度
      let img_width = img_arr[0].clientWidth;
      //每一行显示几列
      let columns = parseInt(pm_width / img_width);
      // console.log(pm_width,img_width,columns)
      //存储每一列的高度值
      let columsArr = [];
      let space = 10;
      console.log(img_width)

      for (let i = 0; i < img_arr.length; i++) {
        if (i < columns) {
          img_arr[i].style.top = "0px";
          img_arr[i].style.left = (img_width + space) * i + "px";
          columsArr.push(img_arr[i].clientHeight);
          console.log(columsArr)
        } else {
            // 最小下标
          let minIndex = 0;
            //最小高度
          let minHeight = columsArr[0];
          for (var m = 0; m < columsArr.length; m++) {
            if (columsArr[m] < minHeight) {
              minIndex = m;
              minHeight = columsArr[m];
            }
          }
        //   console.log(minHeight)
          img_arr[i].style.left = img_arr[minIndex].offsetLeft + "px";
          img_arr[i].style.top = minHeight + space + "px";
          columsArr[minIndex] = minHeight + img_arr[i].clientHeight + space;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  position: relative;
  .item {
    width: 48%;
    position: absolute;
    img {
      width: 100%;
    }
  }
}
</style>

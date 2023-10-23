<template>
  <div class="wrapper">
    <div class="img" :style="`background-image: url(${imgUrl})`"></div>
    <div class="main">
      <div class="btns">
        <el-button
          v-if="isBackButtonVisable"
          type="primary"
          :icon="Back"
          circle
          class="back"
          @click="backFunc"
        />
        <el-button class="btn" @click="goRandom">Get random cocktail</el-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { Back } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTERS_PATH } from "@/constants";
const props = defineProps({
  imgUrl: {
    typeof: String,
  },
  backFunc: {
    typeof: Function,
  },
  isBackButtonVisable:{
    typeof: Boolean,
    default: true
  }
});
const route = useRoute()
const router = useRouter()

const routName =  computed(() => route.name)

function goRandom() {  
  router.push(ROUTERS_PATH.COCKTAIL_RANDOM)
  if (routName.value === ROUTERS_PATH.COCKTAIL_RANDOM) {
    router.go()
  }
}

</script>

<style lang="scss">
.wrapper {
  display: flex;
  background: #141414;
  min-height: 100vh;
}
.img {
  width: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.main {
  width: 50%;
  padding: 32px 40px;
  position: relative;
}
.btn {
  position: absolute;
  color: #fff;
  font-size: 16px;
  top: 32px;
  right: 40px;
  background: #ff0f82;
  border-color: #ff0f82;
  color: #ffffff;
  &:hover,
  &:active,
  &:focus {
    background: #ff0f82;
    border-color: #ff0f82;
    color: #fff;
  }
}
.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .el-button:focus,
  & .el-button:active {
    border-color: #fff;
    background-color: transparent;
  }
}
.back {
  width: 53px;
  height: 53px;
  background-color: transparent;
  border-color: #fff;
  font-size: 25px;

  &:hover {
    border-color: #ff0f82;
    background-color: transparent;
  }
}
</style>
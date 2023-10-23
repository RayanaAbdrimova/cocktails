<template>
  <div v-if="cocktail" class="wrap">
    <AppLayout :imgUrl="cocktail.strDrinkThumb" :backFunc="goBack">
      <div class="info">
        <h2 class="title">{{ cocktail.strDrink }}</h2>
        <div class="line"></div>
        <div class="slider">
          <Swiper
            :slides-per-view="3"
            :space-between="50"
            class="swiper"
          >
            <SwiperSlide v-for="(ingredients, idx) in ingredient" :key="idx">
              <img :src="`${INGREDIENT_PIC}${ingredients}-Small.png`" alt="">
              <p class="name">{{ ingredients }}</p> 
            </SwiperSlide>
           
          </Swiper>
        </div>
        <div class="instructions">
          <p class="instructions__category">{{ cocktail.strCategory }}</p>
          <p class="instructions__cocktail">{{ cocktail.strInstructions }}</p>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";
import { computed } from "vue";
import { COCKTAILS_RANDOM, INGREDIENT_PIC } from "@/constants";
import { ref } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const route = useRoute();
const router = useRouter();

const cocktailId = computed(() => route.path.split("/").pop());
const cocktail = ref(null);

const ingredient = computed(() => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break;

    const ingredient = cocktail.value[`strIngredient${i}`];
    
    ingredients.push(ingredient);
  }
  return ingredients;
});

async function getCocktail() {
  const data = await axios.get(COCKTAILS_RANDOM);
  cocktail.value = data.data.drinks[0];
}
function goBack() {
  router.go(-1);
}
getCocktail();
</script>

<style lang="scss">
.list {
  width: 560px;
  padding: 50px 0 80px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 40px;
}
.list__item {
  position: relative;
  padding-left: 30px;
  color: #fff;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 1.8px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background: url("@/assets/img/heart.svg") no-repeat 50%;
    width: 17px;
    height: 17px;
    margin-right: 20px;
  }
}
.instructions {
  color: #d3d3d3;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 2px;
  max-width: 516px;
  widows: 100%;
  margin: 0 auto;
  &__category {
    margin-bottom: 30px;
  }
}
.slider{
  padding: 50px 0;
}
.swiper{
  width: 600px;
}
.name{
  margin-top: 20px;
}
</style> 
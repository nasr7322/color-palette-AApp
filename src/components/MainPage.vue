<template>
  <div class="container">
    <div class="palette">
      <div class="color" v-for="(color, i) in colors" :key="i" :style="getColorStyle(color) "
        :class="{ selected: i === selectedColorIndex } " @click="selectColor(i)">
        <div class="ptnx" @click="RemoveColor(i)">-</div>
        <Icon class="picker" icon="clarity:color-picker-solid" />
        <input type="color" @change="pickColor(i, $event.target.value)">
        <div class="color-data">
          <div class="colorname">{{ getColorNames(color, i).toUpperCase() }}</div>
          <div class="colorinfo"> Hex: {{ color.toUpperCase() }}</div>
          <div class="colorinfo"> RGP: {{ parseInt(color.slice(1, 3), 16) }}, {{ parseInt(color.slice(3, 5), 16) }}, {{
            parseInt(color.slice(5, 7), 16) }}</div>
        </div>
      </div>
      <div class="ptn" @click="addColor">+</div>
    </div>
    <div class="gptnCont"><button class="gptn" @click="generateComps()">Generate</button></div>
    <div class="compinations_box" v-if="this.showCompinations" v-memo="this.combinations">
      <div class="title">Palette Rating: {{ this.paletteRating }}</div>
      <div class="title">Compinations:</div>
      <div class="compinations">
        <div class="combination" v-for="combination in this.combinations" :key="combination.id"
          :style="{ color: combination.text, backgroundColor: combination.background }">
          <div>{{ combination.textName }} {{ combination.text }} on {{ combination.backgroundName }} {{ combination.background }} </div>
          <div>Contrast Ratio: {{ combination.contrast.toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import namer from 'color-namer';
import './MainPage.css';
import { calculateContrast } from './contrastCalculator.js';

export default {
  name: 'MainPage',
  data() {
    return {
      n: 5,
      colors: ['#faf9f5', '#efe8e2', '#e3d9cf', '#d6c4b0', '#a5907c'],
      colorNames: ["","","","",""],
      selectedColorIndex: null,
      showCompinations: false,
      combinations: [],
      paletteRating: "0",
      nullColor: "ffffff",
    };
  },
  methods: {
    getColorStyle( color) {
      return {
        backgroundColor: color,
      };
    },
    generateComps() {
      this.showCompinations = true;
      this.colorCombinations();
      this.generateRating();
    },
    generateRating() {
      let highContrastCombinations = this.combinations.filter(combination => combination.contrast > 3);
      this.paletteRating = (highContrastCombinations.length + "/" + this.n * (this.n - 1)).toString();
    },
    getColorNames(color, i) {
      let names = namer(color).ntc[0].name
      this.colorNames[i]=names;
      return names;
    },
    selectColor(index) {
      if (index == this.selectedColorIndex) {
        this.selectedColorIndex=null;
        return;
      }
      this.selectedColorIndex = index;
    },
    pickColor(i, event) {
      console.log(event);
      this.colors[i] = event;
      this.selectedColorIndex = null;
    },
    addColor() {
      if (this.n >= 7) return;
      this.colors.push('#ffffff'); // Add a new color (white by default)
      this.n++;
    },
    RemoveColor(index) {
      if (this.n <= 2) return;
      this.colors.splice(index, 1);
      this.n--;
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text');

      const isValidHexColor = /^#?([0-9A-Fa-f]{3}){1,2}$/i.test(pastedText);
      if (isValidHexColor && this.selectedColorIndex !== null) {
        this.colors[this.selectedColorIndex] = pastedText;
        this.pickColor();
      } else {
        console.error('Invalid color format: ', pastedText, this.selectedColorIndex);
      }
    },
    handleCopy(event) {
      if (event.ctrlKey && event.key === 'c' && this.selectedColorIndex !== null) {
        const colorToCopy = this.colors[this.selectedColorIndex];
        navigator.clipboard.writeText(colorToCopy)
          .then(() => {
            console.log('Color copied to clipboard: ', colorToCopy);
          })
          .catch(err => {
            console.error('Failed to copy color to clipboard: ', err);
          });
      }
    },
    colorCombinations() {
      this.combinations = [];
      let l = this.colors.length;
      for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
          if (i === j) continue;
          let contrast = calculateContrast(this.colors[i], this.colors[j]);
          this.combinations.push({
            id: i * l + j,
            text: this.colors[i],
            textName: this.colorNames[i],
            background: this.colors[j],
            backgroundName: this.colorNames[j],
            contrast: contrast
          });
        }
      }
      this.combinations.sort((a, b) => b.contrast - a.contrast);
    },
  },
  mounted() {
    window.addEventListener('paste', this.handlePaste);
    window.addEventListener('keydown', this.handleCopy);
  },
  beforeUnmount() {
    window.removeEventListener('paste', this.handlePaste);
    window.removeEventListener('keydown', this.handleCopy);
  },
  components:{
    Icon,
  },
};
</script>

<style scoped></style>

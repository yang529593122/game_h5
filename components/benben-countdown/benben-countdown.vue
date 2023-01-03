<template>
  <uni-countdown
    :background-color="backgroundColor"
    :color="color"
    :splitor-color="splitorColor"
    :show-day="showDay"
    :show-colon="showColon"
    :day="dates.days"
    :hour="dates.hours"
    :minute="dates.minutes"
    :second="dates.seconds"
    @timeup="$emit('timeup')"
  ></uni-countdown>
</template>
<script>
export default {
  name: 'benben-countdown',
  props: {
    backgroundColor: { type: String, default: '#ffffff' },
    color: { type: String, default: '#333333' },
    splitorColor: { type: String, default: '#333333' },
    showDay: { type: Boolean, default: false },
    showColon: { type: Boolean, default: false },
    countTime: { type: [String, Number], default: 0 },
  },
  components: {},
  computed: {
    dates() {
      return this.$util.downTime(+this.countTime)
    },
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>
<style lang="scss" scoped></style>

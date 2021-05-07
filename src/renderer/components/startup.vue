<template>
  <div class="startup">
    <img width="100" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMISURBVFiFxZZNSFRRGIaf787VmakspwzKKAiCoF/6WwRaBm36oUW1qlZtrEWQVAQRErXoh8lWQfazlCiCINKCkISiNpJQUW0MStJIzChzRp17vhbXynHuvdPcMXx3557zfu/LOd95z4UiUH2o/e6qLU2fiqlhF0MGakwqNaOYAlaRBoqGffmLzimxWBaG3HTmhY3A/Uu6OQxfRnht2zYdCnPCFLBL3Q0Uw6NQBiz6LEKKTwRUmDX5PRA0USEQFRhS6FVw8hSLzgd7mv98ZgCGuv7BQKUFyyNQOubbMPDSgR7jXTxSBuVVeRwCfc2Q+f53nHMEsy1YPU4c3PGaiDvvBYnkF/dSzCm3xALx4QqwdIK7JqtcTGC6n/ooykb74r8Y+NdcLpk4/WwDKcDRYIIDDP4vA45CVx4DHw2YPGtCGwB460C/j0C/wrt8YVAgco49AzxzYKHAPMttzLRCt4H3BnxiAGfAvd9WzF/MDLrrAg2Au8WdCp1+ah7QjBsyhSLHQEwgGkAYwt0RL1hxiMT9uU4KTCrAQCmw2fYPInCPoDWTa8KKQsUOkKCgMtB7L9tEloER4IPJjeGxSKv7OI2HDkOq0zXiqz8Ims7+lmVAgVchu1wVfrQXzpv0/wGLiQ22QjFoq7DHUtaHYTsZPYz7Np0Pw1ehLQzvD6oPtfevrLleQFrkwjOIGrt1isSod4RbBxPSce2rrjCwjzSnaiul4CN7kNR1KuyK/+DkplOSGTvn2YQaZaXCcUtpvdqn+w20AcdMnMVZ6+CzlESGg8RbGnSjER4rHP85gwXj5z0NHJglz1U5DSRUuAEkgAsHE9Ixdl3UOFXR6WXLf49vN2i8+aI23U/qToDmpG5QpRmYqnBse528H6/lG3pXvulaMTwBYkBaLaoPlEvgTX/YoIsc5S0AyjmEuj/iRyTpxfE00Nirc4nwBigHngJVwDccltTOlp4gEy1J3a3CTf7214ltR+Ss33rvHrBIAAMI9bUzpRqhHhhwSgh4alxsPSp3EPYKdCvUBYkD/ALoePsCpUrB9wAAAABJRU5ErkJggg=="/>
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
  export default {
    name: 'startup'
  }
</script>

<style scoped>
  .startup{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    background-color: #fff;
  }
  .lds-spinner {
    margin-top: 40px;
    /*color: official;*/
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    margin-left: -30px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: rgba(0,0,0,0.5);
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

</style>

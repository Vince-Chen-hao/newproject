<template>
  <div>
    <footer id="FixedFooter">
      <div class="bg-light">
        <div class="copyright">
          ⓒ Copyright 2024 Cleans717
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
#FixedFooter {
  position: relative;
  bottom: -50px;
  height: 50px;
  z-index: -1;
}

.footer {
  margin: 0rem;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;
  > li {
    flex: 1 1 0;
    margin-bottom: 2rem;
    text-align: center;
    list-style: none;
  }
}

.footer-title {
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.copyright {
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>

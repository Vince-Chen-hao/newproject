<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination ">
        <li class="page-item" :class="{ disabled: !pageProps.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="pageEmit(pageProps.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pageProps.total_pages"
          :key="page"
          :class="{ active: pageProps.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="pageEmit(page)">{{ page }} </a>
        </li>
        <li class="page-item " :class="{ disabled: !pageProps.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="pageEmit(pageProps.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pageProps'],
  data() {
    return {};
  },

  methods: {
    pageEmit(page) {
      if (page === this.pageProps.current_page) return;
      this.$emit('pagenum_emit', page);
    },
  },
};
</script>

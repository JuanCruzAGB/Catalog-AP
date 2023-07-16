<template>
  <ul class="pagination"
    :class="{
      skeleton,
    }">
    <template v-if="skeleton">
      <li v-for="(item, key) of emptys"
        class="empty item">
        <!--  -->
      </li>
    </template>

    <template v-else>
      <li v-if="prev"
        class="item"
        @click="change(prev.page)">
        <RouterLink class="btn btn-solid btn-maroon"
          :to="{
            query: {
              ...query,
              page: prev.page,
            },
          }">
          <div class="icon fa-solid fa-chevron-left"></div>
        </RouterLink>
      </li>

      <li v-for="(item, key) of result"
        class="item"
        :key="key"
        @click="change(item.page)">
        <RouterLink class="btn btn-solid btn-maroon"
          :class="{
            'router-link-exact-active': item.page == page,
          }"
          :to="{
            query: {
              ...query,
              page: item.page,
            },
          }">
          {{ item.page }}
        </RouterLink>
      </li>

      <li v-if="next"
        class="item"
        @click="change(next.page)">
        <RouterLink class="btn btn-solid btn-maroon"
          :to="{
            query: {
              ...query,
              page: next.page,
            },
          }">
          <div class="icon fa-solid fa-chevron-right"></div>
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      items: {
        default () {
          return {
            // 
          };
        },
        required: false,
      },
      page: {
        default: 1,
        required: false,
      },
      pages: {
        default: 5,
        required: false,
        type: Number,
      },
      skeleton: {
        default: false,
        required: false,
      },
    },
    model: {
      event: 'change',
      prop: 'page',
    },
    computed: {
      emptys () {
        return this.pages + 2;
      },
      length () {
        return Object.keys(this.items).length;
      },
      limit () {
        // * 1 es la representación de la última página que se agregará al resultado
        return this.pages - 1;
      },
      max () {
        let items = Object.keys(this.items);

        let page = this.page;

        if (page >= items.length - 2)
          return items.length - 1;

        if (page <= 3)
          return 4;

        return page + 1;
      },
      min () {
        let items = Object.keys(this.items);

        let page = this.page;

        if (page <= 2)
          return 2;

        if (page == 1)
          page += 2;

        if (page >= items.length - 2)
          return items.length - 3;

        return page - 1;
      },
      next () {
        if (this.length <= this.pages)
          return false;

        let page = this.page + 1;

        if (page > this.length)
          page = 1;

        return {
          page,
        };
      },
      prev () {
        if (this.length <= this.pages)
          return false;

        let page = this.page - 1;

        if (!page)
          page = this.length;

        return {
          page,
        };
      },
      result () {
        let result = [];

        let items = Object.keys(this.items);

        if (items.length <= this.pages) {
          items.map(key => {
            result.push({
              page: key,
            });
          });
        } else {
          result.push({
            page: items.shift(),
          });

          items.map(key => {
            let push = false;

            if (key >= this.min && key <= this.max)
              push = true;

            if (result.length < this.limit) {
              if (push) {
                result.push({
                  page: key,
                });
              }
            }
          });

          result.push({
            page: items.pop(),
          });
        }

        return result;
      },
      query () {
        let query = {
          // 
        };

        if (this.$route.query.id_category)
          query.id_category = this.$route.query.id_category;

        if (this.$route.query.id_location)
          query.id_location = this.$route.query.id_location;

        return query;
      },
    },
    methods: {
      change (page) {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        })

        this.$emit('change', page);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pagination {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    justify-content: center;
    gap: 1rem;
    @media (min-width: 768px) {
      display: flex;
    }

    li {
      display: flex;
      justify-content: center;

      .btn {
        width: 100%;
        height: 2rem;
        @media (min-width: 768px) {
          width: 2rem;
        }
      }
    }

    &.skeleton {
      .empty.item {
        height: 2rem;
        @media (min-width: 768px) {
          width: 2rem;
        }
      }
    }
  }
</style>
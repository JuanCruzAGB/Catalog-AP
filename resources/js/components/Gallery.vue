<template>
  <div class="gallery"
    :class="{
      skeleton,
    }">
    <div class="gallery-body">
      <div class="gallery-container">
        <figure v-if="skeleton"
          class="empty image">
          <!--  -->
        </figure>

        <figure v-else
          class="image">
          <img alt="Imagen seleccionada"
            :src="_provided.images.property.sample" />
        </figure>

        <div v-if="images.length > 1"
          class="gallery-content">
          <ul class="list">
            <template v-if="skeleton">
              <li v-for="(image, key) in emptys"
                class="empty item"
                :key="key">
                <!--  -->
              </li>
            </template>

            <template v-else>
              <li v-for="(image, key) in images"
                class="item"
                :key="key">
                <figure class="image">
                  <img alt="Imagen para elegir"
                    :src="_provided.images.property.sample" />
                </figure>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gallery',
    props: {
      images: {
        default () {
          return [
            // 
          ];
        },
      },
      skeleton: {
        default: false,
        required: true,
      },
    },
    data () {
      return {
        selected: this.images[0] ?? this._provided.images.property.sample,
      };
    },
    computed: {
      emptys () {
        return 6;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .gallery {
    .gallery-body {
      .gallery-container {
        display: grid;
        gap: 1rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .image {
          img {
            width: 100%;
            height: 50vmin;
            object-fit: cover;
            object-position: top center;
            @media (min-width: 1024px) {
              height: 355px;
              border-radius: .25rem;
            }
          }
        }

        .gallery-content {
          max-width: 100%;
          overflow: auto;

          .list {
            display: flex;
            align-items: center;
            gap: 1rem;
            width: fit-content;
            padding-inline: 1rem;

            .item {
              width: 4rem;
              height: 4rem;
            }
          }
        }
      }
    }

    &.skeleton {
      figure.empty {
        &.image {
          height: 50vmin;
          @media (min-width: 1024px) {
            height: 355px;
          }
        }
      }
    }
  }
</style>
<template>
    <div class="text-center mb-5 " >

<nav aria-label="Page navigation example">
<ul class="inline-flex -space-x-px">
    <li  class="page-item" v-for="link in links"  :key="link.label">
        <a  @click.prevent = 'go(link.url)' :class="{'bg-gray-500 ' : link.active === true}" class="cursor-pointer px-3 py-2 ml-0 leading-tight text-green-500 bg-white border border-gray-300 hover:bg-gray-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ link.label }}</a>
    </li>
</ul>
</nav>

</div>
</template>
  
  <script>
  export default {
    props: {
      links: {
        type: Array,
      },
    },
    methods: {
      go(url) {
        this.$emit('fetchLink',url)
      },
      changeLinks(){
        this.links[0].label = "Prev";
        this.links[this.links.length-1].label = "Next";
      }
    },
    mounted() {
      this.changeLinks()
    },
    updated() {
      this.changeLinks()
    }
  }
  </script>
  
  <style scoped>
  @media screen and ( max-width: 400px ){

li.page-item {
    display: none;
}

    .page-item:first-child,
    .page-item:nth-child( 2 ),
    .page-item:nth-last-child( 2 ),
    .page-item:last-child,
    .page-item.active,
    .page-item.disabled {

        display: block;
    }
}
  </style>
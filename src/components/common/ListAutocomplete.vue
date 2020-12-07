<template>
  <q-select outlined use-input stack-label emit-value map-options hide-selected fill-input options-cover
    v-model       ="model"
    :label        ="$t(label)"
    input-debounce="700"
    :options      ="items"
    @filter       ="filterFn"
    :rules        ="rules"
    :loading      ="isLoading"
    :placeholder  ="placeholder"
    class         ="q-pb-sm"
    :disable      ="disable"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { fetch } from '../../boot/myapi';

export default {
  props: {
    source   : {
      type    : Function,
      required: true,
    },
    label    : {
      type    : String,
      required: true,
    },
    rules    : {
      type    : Array,
      required: false,
      default : () => {
        return [];
      },
    },
    isLoading: {
      type    : Boolean,
      required: false,
      default : false,
    },
    disable  : {
      type    : Boolean,
      required: false,
      default : false,
    },
    placeholder: {
      type    : String,
      required: false,
      default : '',
    },
  },

  watch: {
    model(item) {
      this.$emit('selected', item);
    },
  },

  data () {
    return {
      model: null,
      items: null,
    }
  },

  methods : {
    filterFn (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }

      this.source(val)
        .then(items => {
          if (items) {
            this.items = items;

            update()
          }
        })
    },

    isInvalid() {
      return val => {
        return true;
      };
    },
  },
};
</script>

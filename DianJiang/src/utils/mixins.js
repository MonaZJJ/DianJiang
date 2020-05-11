import {formatDate} from './date'
import {cloneObj} from './index'
import {mapGetters} from 'vuex'

export const utilsMixin = {
  methods: {
    formatDate(data) {
      return formatDate(new Date(data), 'yyyy-MM-dd hh:mm:ss')
    },
    cloneObj(obj) {
      return cloneObj(obj)
    }
  }
}

export const permissionMixin = {
  computed: {
    ...mapGetters(['perms'])
  },
  methods: {
    hasPermission(permissionValue) {
      return this.perms.indexOf(permissionValue) !== -1
    }
  }
}

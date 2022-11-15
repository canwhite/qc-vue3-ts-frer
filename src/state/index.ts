/* eslint-disable @typescript-eslint/no-explicit-any */
import { state } from 'frer'

// sync
const count$ = state({
  name: 'count', // key
  initValue: 0, // init data
  producer (next:any, value:any, action:any) {
    let num = value
    // console.log(num)
    switch (action.type) {
      case 'add':
        num++
        next(num)// send data
        break
      case 'sub':
        num--
        next(num)
        break
    }
  }
})

// async
const async$ = state({
  name: 'async_res',
  initValue: { data: '--' },
  producer (next:any, value:any, action:any) {
    const params = action.payload// params
    const request = action.request// methods :return Promise
    switch (action.type) {
      case 'async':
        request(params).then((res:any) => {
          next(res)
        })
        break
    }
  }
})
export {
  count$,
  async$
}

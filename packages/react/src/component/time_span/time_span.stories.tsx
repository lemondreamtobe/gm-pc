import React from 'react'
import { storiesOf } from '@storybook/react'
import TimeSpan from './time_span'
import moment from 'moment'
import { observable } from 'mobx'

const timeSpanStatus = {
  date: moment().startOf('day').toDate(),
  setDate(date: any) {
    this.date = date
  },
}

const store = observable(timeSpanStatus)
const store2 = observable(timeSpanStatus)
const store3 = observable(timeSpanStatus)

storiesOf('TimeSpan', module)
  .add('default', () => (
    <TimeSpan selected={store.date} onSelect={(date) => store.setDate(date)} />
  ))
  .add('不设置时间最大值 && 禁用某个时间段', () => (
    <TimeSpan
      max={null as any}
      disabledSpan={(spanMoment) =>
        moment(spanMoment).isSameOrAfter(moment('11:00', 'HH:mm')) &&
        moment(spanMoment).isSameOrBefore(moment('18:30', 'HH:mm'))
      }
      selected={store.date}
      onSelect={(date) => store.setDate(date)}
    />
  ))

  .add('设置最大时间值为 20:00', () => (
    <TimeSpan
      max={moment().hour(20).minute(0).toDate()}
      selected={store2.date}
      onSelect={(date) => store2.setDate(date)}
    />
  ))

  .add('自定义时间跨度为 1 小时（默认 30 分钟），展示格式为 HH', () => (
    <TimeSpan
      max={moment().hour(23).minute(0).toDate()}
      span={60 * 60 * 1000}
      renderItem={(value) => moment(value).format('HH')}
      selected={store3.date}
      onSelect={(date) => store3.setDate(date)}
    />
  ))

  .add('自定义开始跟结束时间', () => (
    <TimeSpan
      beginTime={moment().hour(8).minute(30).toDate()}
      endTime={moment().hour(22).minute(30).toDate()}
      span={60 * 60 * 1000}
      selected={store3.date}
      onSelect={(date) => store3.setDate(date)}
    />
  ))

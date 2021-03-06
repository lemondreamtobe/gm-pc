import React, { FC, MouseEvent } from 'react'
import classNames from 'classnames'
import moment, { Moment } from 'moment'

interface DayProps {
  /* 日期值 */
  value: Moment
  /* 开始日期 */
  begin: Moment | null
  /* 结束日期 */
  end: Moment | null
  onClick(value: Moment): void
  disabled: boolean
  /* 键盘用 */
  will: Moment
  /* 当前鼠标hover日期 */
  hoverDay?: Moment | null
  onHoverDay?(value: Moment | null): void
}

const Day: FC<DayProps> = ({
  disabled,
  onClick,
  value,
  will,
  begin,
  end,
  hoverDay,
  onHoverDay,
}) => {
  const handleClick = (): void => {
    if (disabled) {
      return
    }
    onClick(value)
  }

  const handleMouseOver = (event: MouseEvent<HTMLSpanElement>): void => {
    if (!onHoverDay) {
      return
    }
    // 获取鼠标所在hover值
    const day = (event.target as HTMLSpanElement).innerText
    if (day && ((begin && !end) || (!begin && end))) {
      !disabled && onHoverDay(moment(value))
    } else {
      onHoverDay(null)
    }
  }

  const nowStart = +moment().startOf('day')
  const valueStart = +value.startOf('day')
  const beginStart = begin ? +begin.startOf('day') : null
  const endStart = end ? +end.startOf('day') : null
  const willStart = +will.startOf('day')
  const hoverStart = hoverDay ? +hoverDay.startOf('day') : null

  const isActive = (): boolean => {
    if (beginStart && endStart) {
      return beginStart <= valueStart && valueStart <= endStart
    } else if (begin) {
      return beginStart === valueStart
    } else if (end) {
      return endStart === valueStart
    }
    return false
  }

  const isHover = (): boolean => {
    if ((begin && end) || !hoverStart) {
      return false
    } else {
      const date = +moment(begin! ?? end!).startOf('day')
      const min = date < hoverStart ? date : hoverStart
      const max = date > hoverStart ? date : hoverStart
      return min < valueStart && valueStart < max
    }
  }

  const cn = classNames('gm-calendar-day', {
    // 无状态
    'gm-calendar-day-old': will.month() > value.month(),
    'gm-calendar-day-new': will.month() < value.month(),
    'gm-calendar-day-now': nowStart === valueStart,
    // 键盘
    'gm-calendar-day-will': willStart === valueStart,
    // 选中态
    active: isActive(),
    'gm-calendar-day-begin': beginStart === valueStart,
    'gm-calendar-day-end': endStart === valueStart,
    // hover态
    'gm-calendar-day-hover': isHover(),
    'gm-calendar-day-hover-end':
      ((begin && !end) || (!begin && end)) && hoverStart === valueStart,
    // 不可用
    'gm-calendar-day-disabled': disabled,
  })

  return (
    <span className={cn} onClick={handleClick} onMouseOver={handleMouseOver}>
      {value.date()}
    </span>
  )
}

export default Day

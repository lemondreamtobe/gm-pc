import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import Td from './td'
import EVENT_TYPE from '@gmfe/react/src/event_type'

const Tr = ({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable,
  isTrHighlight,
  id
}) => {
  // 手动设置active态
  const [active, setActive] = useState(false)
  const props = {
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      'gm-table-x-tr-highlight': isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0,
      'gm-table-x-tr-active': active
    })
  }
  // 目前视为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const dataId = row.original[keyField]

  const handleSetActive = useCallback(
    ({ detail }) => {
      const { target, active } = detail
      if (isActive(target, 'gm-table-x-tr', `${id}-${row.index}`)) {
        setActive(active)
      }
    },
    [row.index, id]
  )

  useEffect(() => {
    // 订阅由popover发布出来的事件
    window.addEventListener(EVENT_TYPE.TR_ACTIVE, handleSetActive)
    return () => {
      window.removeEventListener(EVENT_TYPE.TR_ACTIVE, handleSetActive)
    }
  }, [handleSetActive])

  return (
    <>
      <tr data-id={dataId} data-index={`${id}-${row.index}`} {...props}>
        {row.cells.map((cell, cellIndex) => (
          <Td key={cellIndex} cell={cell} totalWidth={totalWidth} />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

Tr.whyDidYouRender = true

Tr.propTypes = {
  id: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  SubComponent: PropTypes.func,
  keyField: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  totalWidth: PropTypes.number.isRequired,
  isTrDisable: PropTypes.func,
  isTrHighlight: PropTypes.func
}

export default React.memo(Tr)

/**
 * 目标元素的祖先元素是否含有指定className
 * @param target {Element}
 * @param className {string}
 * @param dataIndex {string}
 * @returns {boolean}
 */
function isActive(target, className, dataIndex) {
  let result = false
  if (
    target.classList.contains(className) &&
    target.getAttribute('data-index') === dataIndex
  ) {
    result = true
  } else if (target.parentElement) {
    result = isActive(target.parentElement, className, dataIndex)
  }
  return result
}

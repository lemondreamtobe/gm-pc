import React from 'react'
import _ from 'lodash'
import Modal from './modal'
import CleanModal from './clean_modal'
import RightSideModal from './right_side_modal'
import { Button } from '../button'
import { ModalSize } from './types'

console.log(ModalSize)

export const ComModal = () => (
  <div>
    <Button
      type='primary'
      onClick={() => {
        Modal.render({
          children:
            '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
          title: '我是标题',
        })
      }}
    >
      show modal
    </Button>
  </div>
)

export const ComModalWithSize = () => {
  function render(size: ModalSize) {
    Modal.render({
      size,
      children: '我是内容',
      title: '我是标题',
      onHide: Modal.hide,
    })
  }

  return (
    <div>
      会根据屏幕自适应
      {_.map(ModalSize, (size) => (
        <Button type='primary' onClick={() => render(size)}>
          size {size}
        </Button>
      ))}
    </div>
  )
}

export const ComModalWithNoContentPadding = () => (
  <Button
    type='primary'
    onClick={() => {
      Modal.render({
        noContentPadding: true,
        size: ModalSize.LG,
        children: '我是内容',
        title: '我是标题',
        onHide: Modal.hide,
      })
    }}
  >
    noContentPadding
  </Button>
)

export const ComModalWithOpacityMask = () => (
  <Button
    type='primary'
    onClick={() => {
      Modal.render({
        opacityMask: true,
        size: ModalSize.LG,
        children: '我是内容',
        title: '我是标题',
        onHide: Modal.hide,
      })
    }}
  >
    opacityMask
  </Button>
)

export const ComCleanModal = () => (
  <Button
    type='primary'
    onClick={() => {
      CleanModal.render({
        children: <div className='gm-text-white'>啦啦啦</div>,
        onHide: Modal.hide,
      })
    }}
  >
    CleanModal
  </Button>
)

export const ComRightSideModal = () => (
  <Button
    type='primary'
    onClick={() => {
      RightSideModal.render({
        title: 'asdf',
        children: (
          <div>
            啦啦啦
            <div style={{ height: '1000px' }} />
            啦啦啦
          </div>
        ),
        onHide: Modal.hide,
      })
    }}
  >
    RightSideModal
  </Button>
)

export default {
  title: '浮层/Modal',
}

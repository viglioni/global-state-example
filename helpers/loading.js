import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

const Loading = ({
  text = 'Carregando...',
  marginTop = 80,
  opacity = 0.6,
  backgroundColor = 'black',
    show,
    border=0
}) =>
  show ? (
    <div
      style={{
        position: 'absolute',
        width: `calc(100% - ${2*border}px)`,
        height: `calc(100% - ${2*border}px)`,
          top: border,
        left: border,
        zIndex: 999999,
        textAlign: 'center'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 999998,
          backgroundColor,
          opacity
        }}
      />
      <Spin
        tip={text}
        size="large"
        style={{
          position: 'relative',
          margin: `${marginTop}px auto`,
          zIndex: 'inherit'
        }}
      />
    </div>
  ) : null

Loading.propTypes = {
  text: PropTypes.string,
  marginTop: PropTypes.number,
  opacity: PropTypes.number,
  backgroundColor: PropTypes.string,
  show: PropTypes.bool.isRequired
}

export default Loading

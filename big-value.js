export default {
  id: "nEnIVZibm",
  title: "Lamp",
  /**
   * 属性
   */
  properties: {
    /**
     * 开关状态
     */
    status: {
      title: "On/Off",
      description: "current status of the lamp (on|off)",
      type: "string",
      enum: ["on", "off"],
      readOnly: true
    },
    /**
     * 亮度值
     */
    brightness: {
      title: "Brightness",
      type: "number",
      readOnly: true
    },
    /**
     * 颜色值
     * {
     *   op: 'writeproperty',
     *   href: '#properties/rgb',
     *   value: [255, 0, 0],
     * }
     */
    rgb: {
      type: "array",
      items: {
        type: "number",
        minimum: 0,
        maximum: 255
      },
      minItems: 3,
      maxItems: 3
    }
  },
  /**
   * 事件
   */
  events: {
    /**
     * 错误信息
     * { code: 1002, message: 'something wrong' }
     * on('error', ({ code, message }) => console.log(...));
     */
    error: {
      data: {
        type: "object",
        properties: {
          code: {
            type: "number"
          },
          message: {
            type: "string"
          }
        }
      }
    },
    /**
     * 过热告警
     * on('overhead', (temperature) => console.log(temperature));
     */
    overheated: {
      description: "Lamp reaches a critical temperature (overheating)",
      data: {
        type: "number",
        description: "temperature"
      }
    }
  },
  /**
   * 方法
   */
  actions: {
    /**
     * 开关
     */
    toggle: {
      description: "Turn the lamp on or off"
    },
    /**
     * 亮度调整
     * {
     *   op: 'invokeaction',
     *   href: '#actions/fade',
     *   input: { from: 0, to: 100, duration: 500 },
     * }
     */
    fade: {
      title: "Fade in/out",
      description: "Smooth fade in and out animation.",
      input: {
        type: "object",
        properties: {
          from: {
            type: "integer",
            minimum: 0,
            maximum: 100,
            required: true
          },
          to: {
            type: "integer",
            minimum: 0,
            maximum: 100,
            required: true
          },
          duration: { type: "number" }
        }
        // required: ['to', 'duration'],
      },
      output: { type: "string" }
    }
  },
  /**
   * 页面模板，一个产品可以有多个页面模板
   */
  pages: {
    /**
     * 调试用面板，默认没有可配置项
     */
    debugging: {
      id: "FwOucHPmQ",
      // 页面的类型
      type: "panel",
      // 约定的名称
      identity: "page.DebuggingPanel"
    },
    /**
     * 明亮风格的面板
     */
    light: {
      id: "XIbzHycMw",
      type: "panel",
      /**
       * 为了在各端都能正确渲染，需要预先发布组件到 NPM 仓库，比如：
       * 在 Mobile APP 中使用
       * @leedarson/iot-mobile-engine/containers/LightPanel
       * 在 IDE BOSS/Portal/Editor 中使用
       * @leedarson/iot-mobile-engine/containers/ide/LightPanel
       */
      identity: "page.LightPanel",
      properties: {
        // 允许定义背景颜色与图片
        background: {
          type: "object",
          properties: {
            color: {
              type: "string"
            },
            image: {
              type: "string"
            }
          }
        }
      }
    },
    /**
     * 暗夜风格的面板
     */
    dark: {
      id: "CYGnY4ap5",
      type: "panel",
      identity: "page.DarkPanel"
      // 可以没有可配置项
      // properties: {},
    }
  },
  /**
   * 粒子
   */
  particles: {
    /**
     * 调色板
     */
    pallette: {
      id: "o4NYzT1KG",
      identity: "iot-engine.ui-mobile.ColorPicker",
      title: "Pallette",
      // 依赖 rgb 属性的读写，如果依赖属性不存在，则不可用
      dependencies: [
        {
          op: "readproperty",
          href: "#/properties/rgb"
        },
        {
          op: "writeproperty",
          href: "#/properties/rgb"
        }
      ],
      // 允许自定义的属性接口
      properties: {
        mode: {
          type: "string",
          title: "色彩数",
          enum: ["web-safe", "true-color"],
          default: "true-color"
        }
      }
    },
    /**
     * 调色板 2
     * 分子，由原子组成
     */
    pallette2: {
      id: "VNLeUCt4r",
      identity: "iot-engine.ui-mobile.ColorPicker2",
      title: "Pallette 2",
      // 没有自定义接口
      // properties: {},
      children: [
        {
          particle: "atom.Box",
          properties: {
            // 略
          },
          children: [
            {
              particle: "atom.Pallette",
              properties: {
                // 略
              }
            }
          ]
        }
      ]
    },
    /**
     * 开关
     */
    switch: {
      id: "VNLeUCt4r",
      identity: "atom.Switch",
      title: "Switch",
      // 依赖 status/brightness 属性的读取与 fade 方法的调用，
      // 如果依赖属性/方法不存在，则此组件不可用
      dependencies: [
        {
          op: "readproperty",
          href: "#/properties/status"
        },
        {
          op: "readproperty",
          href: "#/properties/brightness"
        },
        {
          op: "invokeaction",
          href: "#/properties/fade"
        }
      ],
      // 组件可配置项
      properties: {
        size: {
          type: "string",
          title: "尺寸",
          enum: ["small", "medium", "large"],
          default: "medium"
        },
        borderRadius: {
          type: "number",
          title: "圆角弧度",
          minimum: 0,
          maximum: 20,
          default: 0
        }
      }
    }
  }
};

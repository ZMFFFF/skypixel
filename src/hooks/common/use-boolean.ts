import { useState } from 'react'

/**
 * boolean组合式函数
 * @param initValue 初始值
 */
export default function useBoolean(initValue = false) {
  const [bool, setBool] = useState(initValue);


  function setTrue() {
    setBool(true);
  }
  function setFalse() {
    setBool(false);
  }
  function toggle() {
    setBool(!bool);
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle
  };
}

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ text, id, index, changePosition }: any) => {
  const ref = useRef(null);
  // 因为没有定义收集函数，所以返回值数组第一项不要
  const [, drop] = useDrop({
    accept: 'DragDropBox',
    hover: (item: any, monitor) => {
      console.log('hover=====', item, monitor);
      if (!ref.current) return;
      let dragIndex = item.index;
      let hoverIndex = index;
      if (dragIndex === hoverIndex) return; // 如果回到自己的坑，那就什么都不做
      changePosition(dragIndex, hoverIndex); // 调用传入的方法完成交换
      item.index = hoverIndex; // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    }, // 经过的元素
    drop: (item, monitor) => {
      console.log('drop======', item, monitor);
    }, // 最后移动到哪个元素
  });

  const [a, drag] = useDrag({
    type: 'DragDropBox',
    item: { id, index },
    end: () => {},
    isDragging: (monitor) => {
      console.log('isDragging=====', monitor.getItem());
      return index === monitor.getItem().index;
    }, // 是否可以移动到该元素
    collect: (monitor) => {
      console.log('collect=====', monitor, monitor.isDragging());
      return { isDragging: monitor.isDragging(), a: 123 };
    }, // 暴露出来需要的数据
  });
  const { isDragging } = a;
  console.log(a);
  return (
    <div
      className="card_drag"
      ref={drag(drop(ref)) as any} // 这样写可以让它即接收拖拽又实现拖拽
      style={{
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      {text}
    </div>
  );
};
export default Card;

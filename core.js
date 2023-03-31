export default function html([first, ...strings], ...values) {
    return values.reduce((acc, cur) => acc.concat(cur, strings.shift())
    , [first])
    .filter(x => x && x!==true || x === 0) //bay màu cái true với false, cái cuối vì có thể muốn hiển thị số 0 nhưng 0 là falsy
    .join('')
}

export function createStore(reducer) {
    let state = reducer()
    //Dữ liệu trong kho mình ko gọi là store mà gọi là state
    //Return lại dữ liệu ban đầu và lưu vào state
    //Reducer không phải là thành phần của thư viện --> dùng callback

    const roots = new Map()
    // Khác object ở chỗ: có thể lặp qua, có thể đặt key bằng kiểu dữ liệu khác (object chỉ có thể đặt bằng string)

    function render() {
        for (const [root, component] of roots) {
            const output = component() //lấy html từ component (bản chất là function và return ra chuỗi HTML)
            root.innerHTML = output
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component) //lúc này object roots có dữ liệu để render
            render()
        },
        connect(selector = state => state) {
            //view và store là 2 thành phần đứng xa nhau --> cần method để kết nối
            //Đối số mặc định đang là 1 hàm
            //Connect thật chất là Component() khi data thay đổi
            return component => (props, ...args) => component(Object.assign({}, props, selector(state), ...args))
            // function x(component) {
            //     return function y(props, ...args) {
            //         return component(Object.assign({}, props, selector(state), ...args))
            //     }
            // }
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            /**
             * Lần trước, reducer đã return được state --> cần nhận lại giá trị lần trc
             * Dựa vào action để reducer làm việc và return vào state --> store được update lại
             * View thay đổi
             */
            render()
        }
    }
}
// dom을 잡아 동작을 제어하기 위해 변수 설정
const playground = document.querySelector(".playground > ul");


// 세팅
// 상수는 되도록 대문자로
const GAME_ROWS = 20;
const GAME_COLS = 10;


// 변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    tree: [
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}


const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3
}

// 실행
init()


// functions
// 최초 게임시작시
function init(){
    // 스프레드 오퍼레이터 ... movingItem 값만을 가져와서 넣어준다.
    // 고로 movingItem 내용이 변경되어도 값만을 넣었기때문에 같이 값의 내용이 변경되지않는다.
    tempMovingItem = {...movingItem};

    // 테트리스 줄을 만드는 for문
    for (let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    renderBlocks()
}




// 함수로 내용을 빼서 관리
function prependNewLine(){
    // 자바스크립트로 element를 만든다.
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j<10; j++){
        const matrix = document.createElement("li");
        // ul내부에 첫번째부분에 matrix를 삽입
        ul.prepend(matrix);
    }
    // 10개의 matrix를 담은 ul을 li에 넣어준다.
    li.prepend(ul);
    // 최종 세팅
    playground.prepend(li);
}

function renderBlocks(){
    // 디스트럭 처링
    const {type, direction, top, left} = tempMovingItem;
    // tempMovingItem.type 이런식으로 접근하기 복잡할시 변수처럼 바로사용이 가능하다.
    const movingBlock = document.querySelectorAll(".moving");
    movingBlock.forEach(moving => {
        moving.classList.remove(type, "moving")
        console.log(moving)
    })


    // 좌표 접근
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        // 자바 스크립트로 클래스 추가
        target.classList.add(type, "moving");
    });
}


// event handling

// e의 값을 가져옴에 따라 방향키의 값을 찍을수있다
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
            case 37:
                moveBlock("left", -1);
                break;
            case 40:
                moveBlock("top", 1);
            default : 
                break;
    }
    console.log(e)
})

function moveBlock(moveType, amount) {
    tempMovingItem[moveBlock] += amount;
    renderBlocks() 
}
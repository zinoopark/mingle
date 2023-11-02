export const stringToColorCode = (str: string) => {

    let hash = 0;
    // hash라는 변수를 초기화하고 0으로 설정. 이 변수는 입력된 문자열을 기반으로 색상 코드를 생성하는 데 사용된다.

    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        //각 문자열의 유니코드 값을 가져온다.
        hash = ((hash << 5) - hash) + char;
        // 비트 연산 및 산술 연산을 통해 문자 코드를 기반으로 해시의 값을 생성한다. ( '<<' 이 연산자는 비트를 왼쪽으로 이동시킨다)
        hash |= 0; // Convert to 32bit integer
        // 32비트 정수로 변환하여 할당한다. (비트 OR 연산)
    }


    let colorCode = '#' + ('000000' + (hash & 0xFFFFFF).toString(16)).slice(-6);
    // 요약: colorCode 변수는 hash의 값을 사용해 6자리의 16진수 색상 코드를 생성한 것이다.

    // 자세한 설명:
    // hash & 0xffffff는 해시 값을 24비트로 제한한다.
    // &는 비트 AND 연산이고, 이렇게 하면 0xffffff보다 큰 값이 나올 수 없기때문에 이제 hash는 0x000000부터 0xffffff까지의 값을 가질 수 있다.
    // toString(16)로 hash의 값을 16진수(hexadecimal)로 변환한다.
    // '000000' + (hash & 0xFFFFFF).toString(16)은 6자리가 안되는 경우에 앞을 0으로 채워준다.
    // slice(-6)은 뒤에서부터 6자리를 잘라낸다. (6자리가 안되는 경우에는 그대로 출력하지만, 0을 이미 여섯개를 붙여줬기 때문에 항상 6자리가 된다.)
    // 마지막으로 #을 앞에 붙여서 6자리의 16진수 색상 코드를 완성한다.

    return colorCode;
    // 생성된 색상 코드를 반환한다.
}
import '../assets/css/shakti.css';

const ShaktiLoader = (props) => {
    let classNames = 'shakti-loader ';
    classNames += props.page;
    return (

        <div className={classNames}>
            <img className={props.loaderSize} src="/img/shakti-icon.gif" alt="shakti git icon" />
        </div>

    )
}


export default ShaktiLoader;
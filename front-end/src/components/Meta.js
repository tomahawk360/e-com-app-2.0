import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Bienvenido a e-Commerce',
    description: 'La mejor tienda',
    keywords: 'electronica, camara, telefono'
}

export default Meta
import { Card, CardBody, CardImg, ListGroup } from "react-bootstrap";
import './carditem.css'


export function CardItem({title , description, img_url, extra_name, extra, useful_url, useful_url_name}){

    return(
        <>
            <Card border="info">
                {img_url && <CardImg className="cardimg" variant="top" src={img_url} ></CardImg>}
                
                <CardBody>

                    {title && <Card.Title>{title}</Card.Title>}
                    {description && <Card.Text>{description}</Card.Text>}

                </CardBody>
                {extra[0] && <ListGroup>

                    <ListGroup.Item>{extra_name[0].name + ": " + extra[0]}</ListGroup.Item>
                    {extra[1] && <ListGroup.Item>{extra_name[1].name + ": " + extra[1]}</ListGroup.Item>}
                    {extra[2] && <ListGroup.Item>{extra_name[2].name + ": " + extra[2]}</ListGroup.Item>}

                </ListGroup>}
                
                {useful_url && <CardBody>
                    <Card.Link 
                        href={typeof useful_url === "string" ? useful_url : "#"}
                        target="_blank">
                            {useful_url_name}
                    </Card.Link>
                </CardBody>}
            </Card>
        </>
    )

}
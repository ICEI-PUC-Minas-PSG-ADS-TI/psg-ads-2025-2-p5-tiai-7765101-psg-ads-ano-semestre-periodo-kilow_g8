import { Container, DivTitle, Title, SubTitle, ColorTitle } from "./style"

interface DescriptionProps {
    title: string;
    subtitle: string;
}

export default function DescriptionPage({ title, subtitle }: DescriptionProps) {

    return (
        <Container>
            <ColorTitle></ColorTitle>
            <DivTitle>
                <Title> {title} </Title>
                <SubTitle> {subtitle} </SubTitle>
            </DivTitle>
        </Container>
    )
}
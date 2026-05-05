import { Container, Text, DivText, Button, DivIconDevice, Div, DivCharacteristics} from "./style"
import Image from 'next/image';


interface propsDevice {
    name: string;
    power: string;
    hour: string;
    frequency: string;
}

export default function DescriptionDevice({ name, power, hour, frequency }: propsDevice) {
    return (
        <Container>
            <Div>
                <DivIconDevice>
                    <Image src="/assets/icon-device.png" alt="Aparelho"
                        width={35}
                        height={35}
                    />
                </DivIconDevice>
                <DivText>
                    <div>
                        <Text> {name} </Text>
                    </div>
                    <DivCharacteristics>
                        <Text> {power} </Text>
                        <Text> {hour} </Text>
                        <Text> {frequency} </Text>
                    </DivCharacteristics>
                </DivText>
            </Div>
            <Button> Ver mais</Button>
        </Container>
    )
}
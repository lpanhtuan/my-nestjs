
import { IsNumber, IsNumberString } from 'class-validator';

export default class findIdParams {
    @IsNumberString()
    id?: number;
}
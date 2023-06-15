/// <reference types="node" />
/**
 * Utility Class to construct a packet conforming to Minecraft's
 * protocol. All data types are BE except VarInt and VarLong.
 *
 * @see https://wiki.vg/Protocol
 */
export declare class ServerBoundPacket {
    private buffer;
    protected constructor();
    static build(): ServerBoundPacket;
    /**
     * Packet is prefixed with its data length as a VarInt.
     *
     * @see https://wiki.vg/Protocol#Packet_format
     */
    toBuffer(): Buffer;
    writeBytes(...bytes: number[]): ServerBoundPacket;
    /**
     * @see https://wiki.vg/Protocol#VarInt_and_VarLong
     */
    writeVarInt(value: number): ServerBoundPacket;
    /**
     * Strings are prefixed with their length as a VarInt.
     *
     * @see https://wiki.vg/Protocol#Data_types
     */
    writeString(string: string): ServerBoundPacket;
    writeUnsignedShort(short: number): ServerBoundPacket;
}
/**
 * Utility Class to read a client-bound packet conforming to
 * Minecraft's protocol. All data types are BE except VarInt
 * and VarLong.
 *
 * @see https://wiki.vg/Protocol
 */
export declare class ClientBoundPacket {
    private buffer;
    constructor(buffer: Buffer);
    append(buffer: Buffer): void;
    readByte(): number;
    readBytes(length: number): number[];
    readVarInt(): number;
    readString(): string;
}
export declare class ProtocolUtils {
    static getVarIntSize(value: number): number;
}
